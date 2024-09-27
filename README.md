# Silta frontend project template

This is a basic repository template for deploying a node.js application with the Silta `frontend` chart.

The express application in index.js is just there as an example, feel free to replace it. The only requirements are:

- Your project's `package.json` should be in the repository root. 
- Your `package.json` includes a `build` command used to build the codebase after the installation of npm packages.
- Your `package.json` includes a `start` command used to start your application in the deployed environment.

## NVM (Node Version Manager)

It is recommended to use [NVM](https://github.com/nvm-sh/nvm) in order to switch on correct Node.js and npm versions with ease.

On Linux and MacOS use:
```shell
nvm use
```

On Windows use:
```shell
nvm use $($Get-Content .nvmrc)
```

## Troubleshooting

### On Windows

- Linting probably won't work directly with command `npm run lint` do it via lint-staged with command `npx lint-staged`.
  Don't worry per-commit hooks will work fine.
- In your code editor use LF all the time, otherwise there will be prettier errors when linting.
- If having LF in your editor is not enough, try this command "git config --global core.autocrlf false".More info here https://stackoverflow.com/questions/25724969/sourcetree-line-ending-issue
