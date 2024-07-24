import React, { useState } from "react";
import styles from "./form.module.scss";
import BrandLogo from "../../../../components/shared/brand";
import Signin from "../../partials/signin";
import Signup from "../../partials/signup";

function Form() {
  const [active, setActive] = useState("signin");

  return (
    <section className={styles["form-container"]}>
      <BrandLogo />
      {active === "signin" ? <Signin /> : <Signup handleSwitch={()=>setActive("signin")}/>}
      {active === "signin" ? (
        <p>
          Not a registered user?{" "}
          <span onClick={() => setActive("signup")}><u>Sign Up Now</u></span>
        </p>
      ) : (
        <p>
          Already a registered user?{" "}
          <span onClick={() => setActive("signin")}><u>Sign In Now</u></span>
        </p>
      )}
    </section>
  );
}

export default Form;
