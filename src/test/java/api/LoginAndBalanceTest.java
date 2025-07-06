package api;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

public class LoginAndBalanceTest extends TestBase {

    @Test
    void userCanLoginAndHasZeroOpeningBalance() {
        AuthSession session = loginAs("testuser@qa.com", "Parole123");

        Response balanceResponse = given()
                .log().all()
                .contentType(ContentType.JSON)
                .cookie("JSESSIONID", session.jsessionId)
                .header("x-xsrf-token", session.csrfToken)
                .body("""
                    {
                        "bookingDateFrom": "2024-01-01",
                        "bookingDateTo": "2025-12-31"
                    }
                    """)
                .when()
                .post("/profile/account-entries")
                .then()
                .log().all()
                .statusCode(200)
                .extract()
                .response();

        List<?> results = balanceResponse.jsonPath().getList("data.results");
        assertThat("Result list should be empty", results, hasSize(0));

        float openingBalance = balanceResponse.jsonPath().getFloat("openingBalance");
        float closingBalance = balanceResponse.jsonPath().getFloat("closingBalance");

        assertThat("Opening balance should be 0", openingBalance, equalTo(0.0f));
        assertThat("Closing balance should be 0", closingBalance, equalTo(0.0f));
    }
}
