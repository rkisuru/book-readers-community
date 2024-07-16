package com.rkisuru.book.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public enum BusinessErrorCodes {

    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No code"),
    ACCOUNT_LOCKED(300, HttpStatus.FORBIDDEN, "User account is locked"),
    INCORRECT_CURRENT_PASSWORD(301, HttpStatus.BAD_REQUEST, "Current password is incorrect"),
    NEW_PASSWORD_DOES_NOT_MATCH(302, HttpStatus.BAD_REQUEST, "Password does not match"),
    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, HttpStatus.FORBIDDEN, "Username and / or password is incorrect"),
    
    ;

    @Getter
    private final int code;
    @Getter
    private final String description;
    @Getter
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = httpStatus;
    }
}
