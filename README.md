
<div align="center">
	<h2 align="center">SimpleIssue</h2>
	<h5 align="center">
		Issue management for software teams! Track issues, ship faster ⚡
	</h5>
</div>

<details open>
	<summary>Table of Contents</summary>
	<ol>
		<li>
			<a href="#about-the-project">About The Project</a>
			<ul>
				<li><a href="#preview">Project Preview</a></li>
				<li><a href="#built-with">Built With</a></li>
			</ul>
		</li>
		<li>
			<a href="#getting-started">Getting Started</a>
			<ul>
				<li><a href="#prerequisites">Prerequisites</a></li>
				<li><a href="#clone-the-repository">Clone the repository</a></li>
			</ul>
		</li>
		<li>
			<a href="#usage">Usage</a>
			<ul>
				<li><a href="#run-in-production-mode">Run in production mode</a></li>
				<li><a href="#run-in-development-mode">Run in development mode</a></li>
			</ul>
		</li>
		<li><a href="#license">License</a></li>
		<li><a href="#contact">Contact</a></li>
	</ol>
</details>

## About The Project

In software engineering, an issue can be defined as a piece of work that needs to be done. An issue can be a bug, a feature, or an improvement to the product. A lot of times issues are mismanaged and not well maintained. To develop high quality products, it is really important that software teams maintain a good track of issues.

It is written in my favorite language of course, TypeScript. I spent a lot of time on designing the database schema which is powered by  [Prisma](https://www.prisma.io/).

I used  [React Table](https://react-table.tanstack.com/)  to efficiently render tables in the Next.JS application. I'm a great admirer of Tanner Linsley's work on React Packages ecosystem. The DX, performance and documentation are of amazing quality. It is a great tool to do tables in react! And trust me, tables are not fun as they look.


Salient features

So with with SimpleIssue, you can create infinite organizations, add members to them, and create and manage issues.

Optimistic UI. No more loading spinners, the UI is updated before the data is even fetched.

You can also comment on issue, change its Priority ("we want it done by friday, and yes your holiday is cancelled"). as well as project status.

All tables are fully paginated, searchable and sortable (pun-intended)

### Preview

<div align="center">
	<img src="https://omkarkulkarni.vercel.app/static/images/projects/simpleissue/1.png" alt="demo" width="800">
	<img src="https://omkarkulkarni.vercel.app/static/images/projects/simpleissue/2.png" alt="demo" width="800">
	<img src="https://omkarkulkarni.vercel.app/static/images/projects/simpleissue/3.png" alt="demo" width="800">
	<img src="https://omkarkulkarni.vercel.app/static/images/projects/simpleissue/4.png" alt="demo" width="800">
	<img src="https://omkarkulkarni.vercel.app/static/images/projects/simpleissue/5.png" alt="demo" width="800">
</div>

## Built With

<table align="center" width="800">
	<tr>
		<td align="center" ><a href="https://www.typescriptlang.org"><img style="border-radius: 8px;" src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" width="70px;" height="75px;" alt="TypeScript" /><br /><b><font color="#777">TypeScript</font></b></a></td>
		<td align="center"><a href="https://nextjs.org/"><img src="https://iconape.com/wp-content/files/gm/82643/png/next-js.png" width="70px;" height="75px;" alt="Next JS"/><br /><b><font color="#777">NextJs</font></b></a></td>
		<td align="center"><a href="https://reactjs.org"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/512px-React-icon.svg.png" width="80px;" height="75px;" style="border-radius: 8px;" alt="React JS"/><br /><b><font color="#777">ReactJs</font></b></a></td>
		<td align="center"><a href="https://www.apollographql.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width="75px;"  alt="Express JS"/><br /><b><font color="#777">ExpressJS</font></b></a></td>
		<td align="center"><a href="https://tailwindcss.com/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/600px-Tailwind_CSS_Logo.svg.png" width="75px;" height="75px;" alt="Tailwind"/><br /><b><font color="#777">Tailwind CSS</font></b></a></td>
	</tr>
		<td align="center"><a href="https://nodejs.org/en/"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="75px;" height="75px;" alt="NodeJS"/><br /><b><font color="#777">NodeJS</font></b></a></td>
		<td align="center"><a href="https://www.prisma.io/"><img src="https://iconape.com/wp-content/files/xs/85603/svg/prisma-3.svg" width="110px;" height="75px;" alt="Prisma"/><br /><b><font color="#777">Prisma</font></b></a></td>
		<td align="center"><a href="https://www.postgresql.org/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/540px-Postgresql_elephant.svg.png" width="75px;" height="75px;" alt="PostgreSQL"/><br /><b><font color="#777">PostgreSQL</font></b></a></td>
		<td align="center"><a href="https://react-table.tanstack.com"><img src="https://react-table.tanstack.com/_next/static/images/logo-light-66d4dd9109004332c863391e6d1cb309.svg" width="160px;" height="75px;" alt="PostgreSQL"/><br /><b><font color="#777">React Table</font></b></a></td>

</table>

## Getting Started

#### Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/)
-   [Git](https://git-scm.com/downloads)
- [PostgreSQL](https://www.postgresql.org/)

#### Clone the repository

```bash
git clone https://github.com/OmkarK45/dogemart-frontend
```

## Usage

#### Run in production mode

```bash
yarn start
```

> Make sure to install dependencies with `yarn` command before deploy.

#### Run in development mode

```bash
yarn dev
```

> Make sure to install dependencies with `yarn` command before development.\

#### Browse the app

-   **Frontend - [http://localhost:3000](http://localhost:3000)**
-   **Backend REST API - [http://localhost:5000/api](http://localhost:5000/graphql)**

## License

Published and distributed under the MIT License.

## Contact

Email - [omkarak45@gmail.com](https://mail.google.com/mail/?view=cm&fs=1&to=omkarak45@gmail.com&su=%23Issue@DogeFlix:&body=Your%20Issue%20Here) \
Twitter - [@omkar_k45](https://twitter.com/omkar_k45) 
