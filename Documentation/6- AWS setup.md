## **Deploying and Setting Up Projects on AWS**


### **1. React on AWS Amplify**

#### **1.1. Setting Up Amplify with GitHub**

1. **Fork the React project** on GitHub if it's not your own repository.

2. **Sign in** to the AWS Management Console.

3. Navigate to **AWS Amplify**.

4. Click **Connect App**.

5. Choose **GitHub** as the repository service. Connect and authorize AWS Amplify to access your GitHub account.

6. **Select the React repository** and branch.

7. **Review** the build settings and make adjustments if necessary.

8. **Save and deploy**. AWS Amplify will now build and deploy your React project.

For more instruction, please visit this site: https://aws.amazon.com/cn/getting-started/hands-on/build-react-app-amplify-graphql/

### **2. Express Backend Setup**

#### **2.1. Cloning the Project from GitHub**

1. If the Express project is not yours, **fork it on GitHub** first.

2. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/express-repo-name.git
   ```

3. Navigate to the directory:
   ```bash
   cd express-repo-name
   ```

4. **Install dependencies** using npm:
   ```bash
   npm install
   ```

#### **2.2. Preparing Express for Deployment**

1. Ensure your Express application reads **database connection details** from environment variables:
   ```javascript
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
   ```

2. Add a `.gitignore` file if not present. Ensure `node_modules` is listed in the `.gitignore` file.

3. Commit the changes:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   ```

4. Push the changes to GitHub:
   ```bash
   git push
   ```



### **3. MySQL Database on Amazon RDS**

#### **3.1. Setting Up**

1. In the AWS Console, navigate to **RDS**.

2. Click on **Create database**.

3. Select **MySQL** as the database engine.

4. Configure the database:
    - **DB Name**: your choice.
    - **Username**: `admin` or your choice.
    - **Password**: set a secure one and remember it.

5. In connectivity settings, make sure it's **publicly accessible** if you're trying to connect from your local machine or another service.

6. **Launch** the database.

7. Once ready, note down the **endpoint** and **port**. These will be used in your Express app's environment variables.

#### **3.2. Importing Existing `.sql` File**

1. Connect to the RDS MySQL instance using a MySQL client. Example: [MySQL Workbench](https://www.mysql.com/products/workbench/).

2. Once connected, select **File -> Run SQL Script**.

3. Navigate to your `.sql` file and **open** it.

4. **Execute** the script to import your data.

For more instruction, please visit this site: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_GettingStarted.CreatingConnecting.MySQL.html

### **4. Deploying Express Backend on AWS Elastic Beanstalk**

1. Install the **Elastic Beanstalk CLI**:
   ```bash
   pip install awsebcli --upgrade
   ```

2. Navigate to your Express project directory.

3. Initialize Elastic Beanstalk:
   ```bash
   eb init
   ```

4. Create an Elastic Beanstalk environment:
   ```bash
   eb create your-environment-name
   ```

5. Once deployed, go to the AWS Management Console and find your Elastic Beanstalk environment. Navigate to **Configuration** and add the following **Environment Properties**:
    - DB_HOST: {Your RDS endpoint}
    - DB_USER: admin
    - DB_PASSWORD: {Your password}
    - DB_NAME: {Your database name}

6. Redeploy your Express app for changes to take effect:
   ```bash
   eb deploy
   ```

For more instruction, please visit this site: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html

### **5. Connecting React and Express**

1. Update your React project's API endpoint URLs to point to your **Express backend URL**.

2. Make sure **CORS** is properly set up in your Express app to accept requests from your React domain.

3. Commit and push the React changes. **Amplify should automatically detect the changes** in your repository and deploy them.

By following this guide, you should have your React projects deployed on AWS Amplify, your Express backend on AWS Elastic Beanstalk connected to a MySQL database on RDS, and data imported from an existing `.sql` file.