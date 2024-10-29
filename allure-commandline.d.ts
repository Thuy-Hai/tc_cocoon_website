declare module "allure-commandline" {
  function allure(args: string[]): {
    on: (event: string, callback: (exitCode: number) => void) => void;
  };
  export = allure;
}
