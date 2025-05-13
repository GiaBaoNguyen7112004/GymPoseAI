FROM maven:3.8.5-openjdk-17 AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17.0.1-jdk-slim
COPY --from=build /target/gympose-0.0.1-SNAPSHOT.jar gympose.jar
EXPOSE 8696
ENTRYPOINT ["java","-jar","gympose.jar"]