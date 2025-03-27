import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useMetaMask } from '@/hooks/use-metamask';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { User, KeyRound, Mail, Lock, ArrowRight, Wallet, Fingerprint, Home } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginValues = z.infer<typeof loginSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

const Login = () => {
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isConnected, account, connectWallet } = useMetaMask();

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (values: LoginValues) => {
    console.log("Login values:", values);
    
    // Simulate login success
    toast({
      title: "Login successful",
      description: `Welcome back, ${values.email}!`,
    });
    
    // Redirect to transactions page
    navigate('/transactions');
  };

  const onRegisterSubmit = (values: RegisterValues) => {
    console.log("Register values:", values);
    
    // Simulate registration success
    toast({
      title: "Registration successful",
      description: `Welcome to TransacShield, ${values.name}!`,
    });
    
    // Redirect to transactions page
    navigate('/transactions');
  };

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      toast({
        title: "Wallet connected",
        description: "Your MetaMask wallet has been connected successfully.",
      });
      navigate('/transactions');
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection failed",
        description: "There was an error connecting your wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleConnectDID = async () => {
    try {
      // Simulate DID connection
      toast({
        title: "DID Connection",
        description: "Connecting to your decentralized identity...",
      });
      
      // Simulate processing
      setTimeout(() => {
        toast({
          title: "DID Connected",
          description: "Your decentralized identity has been verified successfully.",
        });
        navigate('/transactions');
      }, 1500);
    } catch (error) {
      console.error("Failed to connect DID:", error);
      toast({
        title: "DID Connection failed",
        description: "There was an error connecting your DID. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleGoogleAuthSuccess = () => {
    toast({
      title: "Google Authentication Success",
      description: "You have been authenticated with Google",
    });
    navigate('/transactions');
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-32">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to TransacShield</h1>
            <p className="text-xl text-muted-foreground">
              The secure smart contract-based escrow service for cross-border transactions
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Lock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Secure Transactions</h3>
                <p className="text-muted-foreground text-sm">Smart contract escrow for safety</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Cross-Border Payments</h3>
                <p className="text-muted-foreground text-sm">Multiple currencies supported</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="bg-primary/10 p-2 rounded-full mr-4">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Crypto & Fiat Integration</h3>
                <p className="text-muted-foreground text-sm">Flexible payment options</p>
              </div>
            </div>
          </div>
          
          <Link to="/">
            <Button variant="outline" className="mt-6">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Continue with email, connect your wallet or use decentralized identity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                
                <div className="mb-6">
                  <div className="flex justify-center space-x-4 mb-4">
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${userType === 'buyer' ? 'bg-secondary' : ''}`}
                      onClick={() => setUserType('buyer')}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Buyer
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${userType === 'seller' ? 'bg-secondary' : ''}`}
                      onClick={() => setUserType('seller')}
                    >
                      <KeyRound className="mr-2 h-4 w-4" />
                      Seller
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="your.email@example.com" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Sign In
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="John Doe" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="your.email@example.com" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={registerForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10" {...field} />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full">
                        Create Account
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="relative w-full mb-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3 w-full">
                <GoogleAuthButton onSuccess={handleGoogleAuthSuccess} />
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleConnectWallet}
                  disabled={isConnected}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnected ? `Connected: ${account?.substring(0, 6)}...${account?.substring(account.length - 4)}` : "Connect MetaMask"}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleConnectDID}
                >
                  <Fingerprint className="mr-2 h-4 w-4" />
                  Connect with Decentralized ID
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
