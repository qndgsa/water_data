# Installing WebStorm and Setting Up GitHub Integration

This guide will walk you through the process of installing WebStorm, setting up your development environment, and connecting it to GitHub. WebStorm is a popular IDE developed by JetBrains for JavaScript development, including Node.js, React, Angular, and Vue.js.

## Prerequisites

- A computer with an operating system supported by WebStorm (Windows, macOS, or Linux).
- A GitHub account. If you don't have one, sign up [here](https://github.com/).

## Step-by-Step Guide

### 1. Installing WebStorm:

1.1. **Download WebStorm**:
- Visit the official [WebStorm download page](https://www.jetbrains.com/webstorm/download/).
- Choose the appropriate version for your operating system (Windows, macOS, or Linux) and download it.

1.2. **Install WebStorm**:

- **Windows**: Run the `.exe` installer you downloaded and follow the on-screen instructions.
- **macOS**: Open the `.dmg` file you downloaded and drag the WebStorm app into the Applications folder.
- **Linux**: Extract the `.tar.gz` file you downloaded and run the `webstorm.sh` from the `bin` directory.

1.3. **Activate WebStorm**:
- When you first launch WebStorm, you'll be prompted to enter a license. If you don't have one, you can start with a 30-day free trial. JetBrains also offers free licenses for students.

### 2. Setting Up Your Development Environment:

2.1. **Configure Code Style**:
- Go to `Preferences` (or `Settings` on Windows/Linux) > `Editor` > `Code Style`.
- Adjust the code formatting settings according to your preferences or team's guidelines.

2.2. **Install Plugins**:
- WebStorm has a plethora of plugins to extend its capabilities. To install plugins:
  - Go to `Preferences` (or `Settings` on Windows/Linux) > `Plugins`.
  - Search for the desired plugin and click the `Install` button.

### 3. Connecting WebStorm to GitHub:

3.1. **Add GitHub Account**:
- Go to `Preferences` (or `Settings` on Windows/Linux) > `Version Control` > `GitHub`.
- Click on the `+` button to add your GitHub account.
- You can log in using a token or password. (Token-based authentication is recommended for security reasons.)
  - If using a token, click on `Use Token`, and WebStorm will guide you through the token creation process on GitHub.

3.2. **Clone a Repository**:
- Go to `File` > `New` > `Project from Version Control`.
- Choose `GitHub` from the dropdown.
- Select the repository you want to clone and specify the directory where you want your project to be saved.
- Click on the `Clone` button.

3.3. **Commit and Push Changes**:
- After making changes in your project, right-click on the root directory and select `Git` > `Commit Directory`.
- Write a commit message and click `Commit`.
- To push your changes to GitHub, right-click again and select `Git` > `Repository` > `Push`.

### 4. Further Configuration:

As you become more accustomed to WebStorm, you can further tailor the environment to your preferences. JetBrains offers extensive [documentation](https://www.jetbrains.com/webstorm/documentation/documentation.html) to help you explore more features of WebStorm.

## Conclusion

You've successfully installed WebStorm, set up your development environment, and connected it to GitHub. WebStorm offers a robust environment for JavaScript development, and with GitHub integration, you can efficiently collaborate and version-control your projects. Happy coding!