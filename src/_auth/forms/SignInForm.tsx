import {useForm} from "react-hook-form";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {SignInValidation} from "@/lib/validation";
import Loader from "@/components/shared/Loader.tsx";
import {useSignInAccount} from "@/lib/react-query/queriesAndMutatuion.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {useUserContext} from "@/context/AuthContext.tsx";

function SignInForm() {
    const {toast} = useToast();
    const {checkAuthUser, isLoading: isUserLoading} = useUserContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        mutateAsync: signInAccount,
        isPending
    } = useSignInAccount();

    const handleSignIn = async (values: z.infer<typeof SignInValidation>) => {

        const session = await signInAccount(values)
        if (!session) {
            toast({
                title: "SignIn failed,Please try again",
            });
            return;
        }
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            toast({
                title: "SignIn failed,Please try again",
            })
            return;
        }
    }

    return (
        <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
                <img src="/assets/images/logo.svg" alt="logo"/>

                <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Log in to your account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    Welcome back! Please enter your details.
                </p>
                <form
                    onSubmit={form.handleSubmit(handleSignIn)}
                    className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Email</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className={"text-red"}/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Password</FormLabel>
                                <FormControl>
                                    <Input type="password" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className={"text-red"}/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="shad-button_primary">
                        {isPending || isUserLoading ? (
                            <div className="flex-center gap-2">
                                <Loader/> Loading...
                            </div>
                        ) : (
                            "Log in"
                        )}
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don&apos;t have an account?
                        <Link
                            to="/sign-up"
                            className="text-primary-500 text-small-semibold ml-1">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}

export default SignInForm;