extern crate diesel;

use actix_web::guard;

use actix_files::{Files};
use actix_web::{App, HttpServer, web};
use actix_web::middleware::{Compress, Logger, TrailingSlash, NormalizePath};
use actix_web::web::Data;
use create_rust_app::AppConfig;

mod schema;
mod services;
mod models;
mod mail;
mod graphql;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    #[cfg(debug_assertions)] create_rust_app::setup_development().await;
    let app_data = create_rust_app::setup();

    let schema = async_graphql::Schema::build(graphql::QueryRoot, graphql::MutationRoot, graphql::SubscriptionRoot)
        .data(app_data.database.clone())
        .data(app_data.mailer.clone())
        .finish();

    simple_logger::init_with_env().unwrap();

    HttpServer::new(move || {
        let mut app = App::new()
            .wrap(Compress::default())
            .wrap(NormalizePath::new(TrailingSlash::MergeOnly))
            .wrap(Logger::default());

        app = app.app_data(Data::new(app_data.database.clone()));
        app = app.app_data(Data::new(app_data.mailer.clone()));
        app = app.app_data(Data::new(schema.clone()));
        app = app.app_data(Data::new(AppConfig {
            app_url: std::env::var("APP_URL").unwrap(),
        }));

        let mut api_scope = web::scope("/api");
        api_scope = api_scope.service(web::resource("/graphql").guard(guard::Post()).to(graphql::index));
        api_scope = api_scope.service(web::resource("/graphql/ws")
                .guard(guard::Get())
                .guard(guard::Header("upgrade", "websocket"))
                .to(graphql::index_ws));
        api_scope = api_scope.service(create_rust_app::auth::endpoints(web::scope("/auth")));
        api_scope = api_scope.service(services::todo::endpoints(web::scope("/todos")));

        #[cfg(debug_assertions)]
        {
            /* Development-only routes */
            // Mount the GraphQL playground on /graphql
            app = app.route("/graphql", web::get().to(graphql::index_playground));
            // Mount development-only API routes
            api_scope = api_scope.service(create_rust_app::dev::endpoints(web::scope("/development")));
            // Mount the admin dashboard on /admin
            app = app.service(web::scope("/admin").service(Files::new("/", ".cargo/admin/dist/").index_file("admin.html")));
        }

        app = app.service(api_scope);
        app = app.default_service(web::get().to(create_rust_app::render_views));
        app
    }).bind("0.0.0.0:3000")?.run().await
}
