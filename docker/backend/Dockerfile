#Build

FROM maven:3.9.6-eclipse-temurin-22 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#Runtime

FROM amazoncorretto:22
ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/book-readers-community-api-*.jar /app/

EXPOSE 8888

ENV DB_URL=jdbc:postgresql://postgres-sql-brc:5432/book_community
ENV JAR_VERSION=${APP_VERSION}
ENV ACTIVE_PROFILE=${PROFILE}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} book-readers-community-api-${JAR_VERSION}.jar