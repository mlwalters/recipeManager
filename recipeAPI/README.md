# Backend API README
### This setup is for macOS. README to be updated for Windows

## Setting up our API

### Project Dependencies

Install the .Net Core 6.0 SDK (<https://www.microsoft.com/net>)

(Homebrew: `brew install --cask dotnet-sdk`)

### Database and Project Tools Setup

Install Docker <https://docs.docker.com/get-docker/>
(Homebrew `brew install docker`)

#### Docker Setup

- In a terminal, run the following to pull in the latest MSSQL Server docker image:

  `docker pull mcr.microsoft.com/mssql/server:2019-CU13-ubuntu-20.04`

- Then run the following to launch an instance of the docker image:

  `docker run -d --name sqlserver_capstone -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=capstone88!' -p 1533:1433 mcr.microsoft.com/mssql/server:2019-CU13-ubuntu-20.04`

    Connection Strings: `"Server=localhost,1533;Initial Catalog=sqlserver_capstone;User Id=sa;Password=capstone88!;"`

- Then run the following and ensure that your new container is listed:

  `docker ps`

- Then start your container, by running:

  `docker start sqlserver_capstone`

#### .Net Tools Setup

Next, install EF Core CLI:

`dotnet tool install --global dotnet-ef`

Note: If you already have this installed you may want to run the following to update it:

`dotnet tool update --global dotnet-ef`

#### To initialize and create your database, ensure your Docker container is running and then

In a terminal, at the backend project level directory, run:

`dotnet ef database update`

#### Add localhost dev certificates for SSL

`dotnet dev-certs https --trust`

If you need to reissue your cert because it has become invalid, open the Keychain Access app and delete the `localhost` cert. Then run the above command again.

#### Add .NET environment variable

To add the environment variable to your shell profile, run:

`code ~/.zshrc` (If you're using bash run: `code ~/.bash_profile`)

Then add the following line into the file editor:

`export ASPNETCORE_ENVIRONMENT=Development`

Then run the following command apply this variable to your running terminal:

`source ~/.zshrc` (If you're using bash run: `source ~/.bash_profile`)

#### Installing a GUI tool to connect to your database

##### Option 2: Installing Azure Data Studio and connecting to your SQL Server instance

Install Azure Data Studio <https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver15>

(Homebrew: `brew install --cask azure-data-studio`)

Connecting to your database

- Click to "Add a Connection"
- Fill out the Connection Details with the following:
  - Conection Type: `Microsoft SQL Server`
  - Server: `localhost`
  - Authentication Type: `SQL Login`
  - User Name: `sa`
  - Password: `capstone88!`
  - Database: `<default>`
  - Server Group: `<default>`
  - Name (optional): (give this a name that is helpful to you)
- Click `Advanced Settings` and add `1533` to the port, click save
- Click `Connect`

Your database should now appear on the left side panel with a green dot signaling an active connection.

## To run the application

In a terminal, within the backend project directory:

Build the app: `dotnet build`

Run the app: `dotnet run`

Run tests: `dotnet test`

## Docker Commands

You will likely need to restart your Docker container after a reboot of your local machine or after Docker installs updates. You may do so by running the following commands or by using the Docker Desktop application <https://docs.docker.com/desktop/mac/install/>. (The desktop application should list your Docker instances and allow you to click the "play" button to start/stop the container.)

### To start your local Docker database container, run

`docker start sqlserver_capstone`

### To stop your local Docker database container, run

`docker stop sqlserver_capstone`

## Accessing Swagger Documentation

To access the swagger docs, you will need to have the backend server running, by running the `dotnet run` command in the backend directory. You can then access the api and the swagger documentation through a browser by navigating to the url: `localhost:7001/swagger` or `https://localhost:7001/swagger/index.html`. (You can find the localhost url to use by looking at the outputted logs after running `dotnet run`, but this is currently set to port 7001.)

## Working with EF database migrations

Resources:
<https://docs.microsoft.com/en-us/ef/core/cli/dotnet>
<https://docs.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli>

### In order to add a new migration

- Make the changes to the EF models (and for anything not on the model, update the IPMContext) as needed.
- Then run the following command from the backend project directory. (Replace `MyMigration` with a descriptive name for your migration.)
  - `dotnet ef migrations add MyMigration`
- Review the generated migration script, which can be found in the `backend/Migrations` directory. You may need to adjust the script to accomplish what you need. Make sure you adjust the Drop script appropriately as well.

### To apply the changes to your database or any changes made by other scripts

- Run the following command from the backend project directory.

  `dotnet ef database update`

### To return/setup your database to a certain migration

- Run the `ef database update` command followed by the name of the migration you would like to set it to from the backend project directory as follows (replacing `MyTargetMigration` with the name of the migration that you want it to run up to):

  `dotnet ef database update MyTargetMigration`


  ### Using SQLite
Download and use DBeaver Community (free version) as GUI