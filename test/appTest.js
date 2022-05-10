import { assert } from "chai";
import axios from "axios";

describe("API testing", () => {
  describe("SignIn()", () => {
    //Success
    it("SignIn succesfull", async () => {
      const body = {
        email: "a@a.com",
        password: "123123123",
      };
      const res = await axios.post("http://localhost:8888/client/signin", body);
      assert.isNotEmpty(res.data);
    });

    //Empty email input error
    it("Email is required", async () => {
      const body = {
        email: "",
        password: "123123123",
      };
      try {
        await axios.post("http://localhost:8888/client/signin", body);
      } catch (error) {
        assert.equal(error.response.status, "400");
      }
    });

    //Empty password input error
    it("Password is required", async () => {
      const body = {
        email: "a@a.com",
        password: "",
      };
      try {
        await axios.post("http://localhost:8888/client/signin", body);
      } catch (error) {
        assert.equal(error.response.status, "400");
      }
    });

    //Empty input error
    it("Email and password are required", async () => {
      try {
        await axios.post("http://localhost:8888/client/signin", {
          email: "",
          password: "",
        });
      } catch (error) {
        assert.equal(error.response.status, 400);
      }
    });

    //Wrong Credentials
    it("Wrong credentials", async () => {
      const body = {
        email: "a@a.com",
        password: "123123",
      };
      try {
        await axios.post("http://localhost:8888/client/signin", body);
      } catch (error) {
        assert.equal(error.response.status, "400");
      }
    });
  });

  describe("SendEmail()", () => {
    // Send email successfull
    it("Email sent successfully", async () => {
      const res = await axios.post("http://localhost:8888/client/sendEmail", {
        email: "Elie--Moussallem@outlook.com",
        subject: "TestFolder",
        text: "Testing again",
      });
      assert.equal(res.status, 200);
    });

    //Empty inputs
    it("Inputs are required", async () => {
      try {
        await axios.post("http://localhost:8888/client/sendEmail", {
          email: "",
          subject: "",
          text: "",
        });
      } catch (error) {
        // console.log(error);
        assert.equal(error.response.status, "400");
      }
    });

    //Email errors
    describe("Email errors:", () => {
      //Empty email input
      it("Email is required", async () => {
        try {
          await axios.post("http://localhost:8888/client/sendEmail", {
            email: "",
            subject: "Text",
            text: "Text",
          });
        } catch (error) {
          // console.log(error);
          assert.equal(error.response.status, "400");
        }
      });

      //Wrong email synthax
      it("Email synthax is incorrect", async () => {
        try {
          await axios.post("http://localhost:8888/client/sendEmail", {
            email: "aaaaaa",
            subject: "aaaaa",
            text: "aaaaa",
          });
        } catch (error) {
          // console.log(error);
          assert.equal(error.response.status, "400");
        }
      });

      //Empty email and subject input
      it("Email and subject are required", async () => {
        try {
          await axios.post("http://localhost:8888/client/sendEmail", {
            email: "",
            subject: "",
            text: "Test",
          });
        } catch (error) {
          assert.equal(error.response.status, "400");
        }
      });

      //Empty email and Text input
      it("Email and text are required", async () => {
        try {
          await axios.post("http://localhost:8888/client/sendEmail", {
            email: "",
            subject: "Test",
            text: "",
          });
        } catch (error) {
          assert.equal(error.response.status, "400");
        }
      });
    });

    // Subject errors
    describe("Subject errors:", () => {
      //subject subject input
      it("Subject is required", async () => {
        try {
          await axios.post("http://localhost:8888/client/sendEmail", {
            email: "Elie--Moussallem@outlook.com",
            subject: "",
            text: "Test",
          });
        } catch (error) {
          assert.equal(error.response.status, "400");
        }
      });
    });

    // Text errors
    describe("Text errors:", () => {
      //Empty text input
      it("Text is required", async () => {
        try {
          await axios.post("http://localhost:8888/client/sendEmail", {
            email: "Elie--Moussallem@outlook.com",
            subject: "Test",
            text: "",
          });
        } catch (error) {
          assert.equal(error.response.status, "400");
        }
      });
    });
  });
});
