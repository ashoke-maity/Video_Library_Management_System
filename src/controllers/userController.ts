import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/db";

// Define the interface for user registration data (only what comes from the request)
interface UserRegistrationData {
  FullName: string;
  Email: string;
  Password: string;
}

interface UserRegistrationResponse {
  status: number;
  message: string;
  user?: User;
  error?: string;
}

// user registration function
export const registerUser = async (
  userData: UserRegistrationData
): Promise<UserRegistrationResponse> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.Email,
      password: userData.Password,
    });

    if (authError) {
      return {
        status: 400,
        message: "Failed to register user",
        error: authError.message,
      };
    }

    if (authData.user && userData.FullName) {
      const { error: dbError } = await supabase.from("users").insert([
        {
          id: authData.user.id,
          email: userData.Email,
          name: userData.FullName,
        //   password: userData.Password,
          created_at: new Date().toISOString(),
        },
      ]);

      if (dbError) {
        console.error("Error inserting user data:", dbError);
      }
    }

    return {
      status: 201,
      message: "User registered successfully",
      user: authData.user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      status: 500,
      message: "Internal server error during registration",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Define the interface for user login data
interface UserLoginData {
  Email: string;
  Password: string;
}

// Define the login response interface
interface UserLoginResponse {
  status: number;
  message: string;
  user?: User;
  //   session?: any;
  error?: string;
}

//  user login function
export const loginUser = async (
  userData: UserLoginData
): Promise<UserLoginResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.Email,
      password: userData.Password,
    });

    if (error) {
      return {
        status: 401,
        message: "Invalid credentials",
        error: error.message,
      };
    }

    if (data.user) {
      return {
        status: 200,
        message: "Login successful",
        user: data.user,
        // session: data.session,
      };
    }

    return {
      status: 400,
      message: "Login failed",
      error: "No user data returned",
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      status: 500,
      message: "Internal server error during login",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
