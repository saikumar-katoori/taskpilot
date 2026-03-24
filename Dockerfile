# ---------- BUILD STAGE ----------
FROM maven:3.9.11-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

RUN mvn clean package -DskipTests


# ---------- RUN STAGE ----------
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy jar
COPY --from=build /app/target/*.jar app.jar

# 🔥 IMPORTANT: Copy .env file into container
COPY .env .env

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]