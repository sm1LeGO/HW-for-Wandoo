package api;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.BeforeAll;

public abstract class TestBase {

    @BeforeAll
    static void setupRestAssured() {
        RestAssured.baseURI = "https://swaper.com";
        RestAssured.basePath = "/rest/public";
    }

    protected AuthSession loginAs(String username, String password) {
        Response response = RestAssured
                .given()
                .log().all()
                .contentType(ContentType.JSON)
                .body(String.format("""
                    {
                      "name": "%s",
                      "password": "%s",
                      "recaptchaToken": "wandoo"
                    }
                    """, username, password))
                .when()
                .post("/login")
                .then()
                .log().all()
                .statusCode(200)
                .extract()
                .response();

        String jsessionId = response.getCookie("JSESSIONID");
        String csrfToken = response.getHeader("_csrf");

        return new AuthSession(jsessionId, csrfToken);
    }
}
