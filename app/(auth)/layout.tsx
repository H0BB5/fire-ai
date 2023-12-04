const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center min-h-[100svh]">
      {children}
    </div>
  );
};

export default AuthLayout;
