# Resume and Portfolio App

This app is an interactive resume and portfolio site. The goal was to be able to host this on a static site like GitHub
pages or an AWS S3 bucket. So it uses a single page and a JSON file for data.

## Usage

To use this project, rename `public/data.sample.json` to `public/data.json` and replace the placeholder content with
your info. Then run `npm run build` and upload the contents of the resulting `dist` directory to your static host.
