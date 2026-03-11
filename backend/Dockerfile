FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -Dmaven.test.skip=true -Dmaven.surefire.skip=true

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=build /app/target/membership-1.0.0.jar app.jar
EXPOSE 8100
ENTRYPOINT ["java", "-jar", "app.jar"]
