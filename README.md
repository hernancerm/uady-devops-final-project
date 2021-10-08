## Configure the database

Start a local MySQL server and use the following scripts in [`./mysql/`](./mysql):

- `uady_sicei_schema.sql`: Create the database.
- `uady_sicei_populate.sql`: Fill the database with some test data.

Place an `.env` file at the root of this project with the database connection config, as shown as example in [`.env.example`](.env.example)

## Build and run

Install dependencies

```text
npm install
```

Build

```text
npm run build
```

Run

```text
npm run start
```


See the list of students: <http://localhost:8080/api/students>
