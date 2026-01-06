// SERVER component — no "use client"
import SignInForm from "@/components/auth/SigninForm";
import RedirectIfAuthClient from "@/components/auth/RedirectIfAuth";

export default function SignInPage() {
  return (
    <RedirectIfAuthClient redirectToHomeIfAuth={true}>
      <section className="px-18">
        <div
          className="
            mx-auto
            flex
            min-h-screen
            max-w-7xl
            items-center
            justify-center
            px-6
          "
        >
          <div
            className="
              w-full
              max-w-md
              rounded-sm
              border
              bg-white
              mt-4
              p-6
              shadow-sm
            "
          >
            <h1 className="mb-6 text-lg font-semibold text-blue-600">
              Sign in
            </h1>

            <SignInForm />
          </div>
        </div>
      </section>
    </RedirectIfAuthClient>
  );
}
