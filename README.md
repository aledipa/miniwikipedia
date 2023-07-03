# miniWikipedia

miniWikipedia is a summarised version of the whole Wikipedia encyclopedia. It's a lightweight website and it runs in NodeJS and TypeScript.

<img src="public/img/miniWikipedia_horizontal.svg" width="400" height="100" />

## Manual Installation

To run miniWikipedia locally, you need to have Node.js and npm installed on your machine. You also need to get an API key from Wikipedia to access their data. Follow these steps to set up the project:

1. Clone this repository to your local machine: `git clone https://github.com/aledipa/miniwikipedia.git`
2. Navigate to the project directory: `cd miniWikipedia`
3. Install the dependencies: `npm install`
4. Build: `npm run build`
5. Run the server: `node dist/index.js`
6. Open your browser and go to `http://localhost:3000` to see the website

## Docker Installation
<img src=".github/img/docker-logo.webp" width="400" height="100" />

It's possible to install the docker image of miniWikipedia by running this command:

`docker container run -p YOUR_PORT:3000 -d d0ckmg/miniwikipedia`

or alternatively, you can use a docker-compose file:

**docker-compose.yml**

```yaml
version: "3.9"
services:
  node:
    image: d0ckmg/miniwikipedia
    container_name: miniwikipedia
    ports:
      - 3000:3000/tcp
```
## Usage

To use miniWikipedia, simply type a topic in the search box and click the search button or press 'enter'. While typing, below the input bar, will appear a text suggestion, to select it just click on it or press 'tab'.

## Contributing

miniWikipedia is an open source project and welcomes contributions from anyone who is interested. If you want to contribute, please follow these guidelines:

- Fork this repository and create a new branch for your feature or bug fix
- Write clear and concise code in TypeScript and follow the code style of the project
- Update the readme.md file if necessary
- Commit your changes and push them to your forked repository
- Create a pull request with a descriptive title and message explaining your changes

## License

miniWikipedia is licensed under the MIT License. See the LICENSE file for more details.
