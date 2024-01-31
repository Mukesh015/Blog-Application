import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function DashboardPage() {
  return (
    <div className="flex-col px-10 bg-yellow-100 text-black align-middle">
      <button>
        {" "}
        <LoginLink>Sign in</LoginLink>{" "}
      </button>
      <button>
        {" "}
        <RegisterLink>Sign up</RegisterLink>{" "}
      </button>
    </div>
  );
}
