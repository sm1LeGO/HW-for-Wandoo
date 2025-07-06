package api;

public class AuthSession {
    public final String jsessionId;
    public final String csrfToken;

    public AuthSession(String jsessionId, String csrfToken) {
        this.jsessionId = jsessionId;
        this.csrfToken = csrfToken;
    }
}
