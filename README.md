## Build and run

Build the Docker image:

```txt
docker image build . -t hercerm/sicei
```

Run the Docker image:

```txt
docker container run -p 49160:8080 -d --name c-hercerm-sicei hercerm/sicei
```

See the list of students: <http://localhost:49160/api/students>
