const fs = require("fs");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown")
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);


// array of questions for user input 
function promptUser(){
    return inquirer.prompt([
    
      // title
    {
      type: 'input',
      name: 'title',
      message: 'Enter the name of your application (Required)',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter the name of your project!');
          return false;
        }
      }
    },

    //description
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your project. (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a description of your project!');
          return false;
        }
      }
    },

    //installation
    {
        type: 'input',
        name: 'installation',
        message: 'Please include applicable installation instructions. (Optional)'
    },

    //usage
    {
        type: 'input',
        name: 'usage',
        message: 'Please include applicable usage instructions. (Optional)'
    },

    //license
    {
        type: 'checkbox',
        name: 'license',
        message: 'Choose a license for this project: (Optional)',
        choices: [
			'GNU',
			'Mozilla',
			'Apache',
			'MIT',
			'Other',
			'None',
        ]
    },

    //contributions
    {
        type: 'input',
        name: 'contributors',
        message: 'Who contributed to this project? (Required)',
        validate: contributorsInput => {
          if (contributorsInput) {
            return true;
          } else {
            console.log('Please enter names of contributors!');
            return false;
          }
        }
    },

    //testing
    {
        type: 'input',
        name: 'test',
        message: 'Please include applicable testing instructions. (Optional)'
    },

    //github username
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username? (Required)',
        validate: githubInput => {
          if (githubInput) {
            return true;
          } else {
            console.log('Please enter your GitHub username!');
            return false;
          }
        }
    },

    //email address
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address? (Required)',
        validate: emailInput => {
          if (emailInput) {
            return true;
          } else {
            console.log('Please enter your email address!');
            return false;
          }
        }
    },
    
    ]);
} 

// function to generate README file/ initializing app
async function init() {
    const userInput = await promptUser();
    const generateContent = generateMarkdown(userInput);
    await writeFileAsync('./generatedREADME.md', generateContent);
        console.log('Congrats! Your README is available as generatedREADME.md!');
}

// function to initialize application
init();