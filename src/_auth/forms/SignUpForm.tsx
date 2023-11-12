import {useForm} from "react-hook-form";
import * as z from "zod";
import {SignUpValidation} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import Loader from "@/components/shared/Loader.tsx";
import {useToast} from "@/components/ui/use-toast"
import {useCreateUserAccount, useSignInAccount} from "@/lib/react-query/queriesAndMutatuion.ts";
import {useUserContext} from "@/context/AuthContext.tsx";

function SignUpForm() {

    const {toast} = useToast();
    const {checkAuthUser} = useUserContext();
    const navigate = useNavigate();

    const {
        mutateAsync: createUserAccount,
        isPending: isCreatingUser
    } = useCreateUserAccount();


    const {
        mutateAsync: signInAccount
    } = useSignInAccount();

    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            email: "",
            password: "",
            fullName: "",
            username: "",
        },
    });


    const handleSignUp = async (values: z.infer<typeof SignUpValidation>) => {
        const newUser = await createUserAccount(values);
        if (!newUser) {
            return toast({
                title: "SignUp failed,Please try again",
            })
        }

        const session = await signInAccount({
            email: values.email,
            password: values.password
        })
        if (!session) {
            return toast({
                title: "SignIn failed,Please try again",
            })
        }
        const isLoggedIn = await checkAuthUser();
        if (isLoggedIn) {
            form.reset();
            navigate('/');
        } else {
            return toast({
                title: "SignIn failed,Please try again",
            })
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
                    onSubmit={form.handleSubmit(handleSignUp)}
                    className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Full Name</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className={"text-red"}/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="shad-form_label">Username</FormLabel>
                                <FormControl>
                                    <Input type="text" className="shad-input" {...field} />
                                </FormControl>
                                <FormMessage className={"text-red"}/>
                            </FormItem>
                        )}
                    />
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
                        {isCreatingUser ? (
                            <div className="flex-center gap-2">
                                <Loader/> Loading...
                            </div>
                        ) : (
                            "Register"
                        )}
                    </Button>

                    <p className="text-small-regular text-light-2 text-center mt-2">
                        Don&apos;t have an account?
                        <Link
                            to="/sign-in"
                            className="text-primary-500 text-small-semibold ml-1">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
}

export default SignUpForm;