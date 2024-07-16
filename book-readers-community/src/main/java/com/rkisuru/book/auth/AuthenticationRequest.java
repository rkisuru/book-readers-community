package com.rkisuru.book.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthenticationRequest {

    @Email(message = "Enter a valid email! Ex: isuru12@gmail.com")
    @NotEmpty(message = "Email is required")
    @NotBlank(message = "Email is required")
    private String email;

    @NotEmpty(message = "Password required")
    @NotBlank(message = "Password required")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;
}
