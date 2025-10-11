# ---- Stage 1: Build with Maven ----
FROM maven:3.9-eclipse-temurin-17 AS builder

WORKDIR /app

# Copy only the files needed to resolve dependencies first (better caching)
COPY pom.xml .
COPY src ./src

# Build the application, skipping tests to speed up CI
RUN mvn clean package -DskipTests

# ---- Stage 2: Run with JDK only ----
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Create uploads folder and set permissions
RUN mkdir -p /app/uploads && chmod -R 755 /app/uploads

# Optional: Add a volume mount point for file uploads
VOLUME /app/uploads

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
