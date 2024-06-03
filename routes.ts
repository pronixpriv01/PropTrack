/**
 * An array of routes that are accessible to the public
 * Thee routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/new-verification"
];

/**
 * An array of routes that are used for authentication
 * Thee routes require authentication
 * @type {string[]}
 */

export const authRoutes = [
    "/error",
    "/sign-in",
    "/sign-up",
    "/password-reset",
    "/new-password",
    "/hub"
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are uses for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/client";