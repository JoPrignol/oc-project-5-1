# Yoga App !

### Overview

This is the backend for the Yoga App, built with Spring Boot. It provides a REST API for the app.

### Dependencies

• Java Version: 1.8

• Spring Boot Version: 2.6.1

• DB: H2 (for tests), MySQL (for prod)

• Jacoco (for code coverage)

### Installation & Setup

Make sure you have the following installed:

• Java 8

• Maven

• MySQL

#### Install dependencies

Install all required dependencies with:

``` mvn clean install ```

#### DB 

An H2 test DB is set for this project. This DB schema is available in:
>src/test/resources/script.sql

#### Run the app

Run the app with:

```mvn spring-boot:run ```

### Launch tests & code coverage

To launch and generate the jacoco code coverage:

``` mvn test ```

The code coverage will be available at:
> /back/target/site/jacoco/index.html


