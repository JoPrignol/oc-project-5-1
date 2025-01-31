# Yoga App !
![Static Badge](https://img.shields.io/badge/Java-1.8-green) ![Static Badge](https://img.shields.io/badge/Spring_Boot-2.6.1-green) ![Static Badge](https://img.shields.io/badge/MySQL-blue) ![Static Badge](https://img.shields.io/badge/H2-blue) ![Static Badge](https://img.shields.io/badge/Maven-orange) ![Static Badge](https://img.shields.io/badge/JUnit-purple) ![Static Badge](https://img.shields.io/badge/Jacoco-purple) 




### Overview

This is the backend for the Yoga App, built with Spring Boot. It provides a REST API for the app.

### Installation & Setup

Make sure you have the following installed:

• Java 8

• Maven

• MySQL

#### Install dependencies

Install all required dependencies with:

``` mvn clean install ```

#### DB 

An H2 test DB is set for the tests. This DB schema is available in:
>src/test/resources/script.sql

#### Run the app

Run the app with:

```mvn spring-boot:run ```

### Launch tests & code coverage

To launch and generate the Jacoco code coverage:

``` mvn test ```

The code coverage will be available at:
> /back/target/site/jacoco/index.html


