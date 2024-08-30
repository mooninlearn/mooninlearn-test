// npm i dotenv @octokit/rest jnj-lib-base
import { execSync } from "child_process";
import { Github } from "jnj-lib-base";

// const options = {
//     userName: "mooninlearn",
//     repoName: "mooninlearn-test",
//     description: "mooninlearn-test",
//     localPath: ""
// }

// setConfigRepo = (options: any) => {
//     let cmd = `cd ${options.name} && git config user.name "${this.account.fullName}"`;
//     cmd += ` && git config user.email "${this.account.email}"`;
//     cmd += ` && git remote set-url origin https://${this.account.token}@github.com/${this.userName}/${options.name}.git`;
//     console.log(cmd);
//     execSync(cmd);
//   };
const pushRepo = (options) => {
    const { userName, repoName, description } = options
    const localPath = options.localPath || process.cwd()
    console.log(`localPath: ${localPath}`);
    // const { userName, repoName } = options
    const github = new Github(userName);
    const {fullName, email, token } = github.account

    // git init
    let cmd = `cd "${localPath}"`;
    cmd += ` && git init`;
    cmd += ` && git config user.name "${fullName}"`;
    cmd += ` && git config user.email "${email}"`;
    cmd += ` && git remote add origin https://${userName}:${token}@github.com/${userName}/${repoName}.git`;
    // cmd += ` && git remote set-url origin https://${token}@github.com/${userName}/${repoName}.git`;  // `git remote add origin ${remoteRepoUrl}`
    console.log(cmd);
    execSync(cmd);

    // git config, add remote
    cmd = `git add . && git commit -m "Initial commit"`;
    console.log(cmd);
    execSync(cmd);

    // // push
    // cmd = `git push -u origin main`;
    // console.log(cmd);
    // execSync(cmd);

}

const options = {
    userName: "mooninlearn",
    repoName: "mooninlearn-test",
    description: "mooninlearn-test",
    localPath: "C:\\JnJ-soft\\Playground\\github-tools"
}

pushRepo(options)
//   // 1. 로컬 폴더를 Git 저장소로 초기화
//   execSync('git init', { cwd: localFolder });
//   console.log('Initialized empty Git repository.');

//   // 2. 원격 저장소를 로컬 저장소에 연결
//   execSync(`git remote add origin ${remoteRepoUrl}`, { cwd: localFolder });
//   console.log(`Added remote origin: ${remoteRepoUrl}`);

//   // 3. 모든 파일을 추가하고 커밋
//   execSync('git add .', { cwd: localFolder });
//   console.log('Staged all files.');

//   execSync('git commit -m "Initial commit"', { cwd: localFolder });
//   console.log('Committed all files.');

//   // 4. 원격 저장소에 푸시
//   execSync('git push -u origin master', { cwd: localFolder });

// // github.createRepo({
// //     name: options.repoName,
// //     description: options.description,
// //     auto_init: false, 
// //     gitignore_template: null,
// //     license_template: null
// // });


// // from octokit import Octokit

// // # Octokit 인스턴스를 생성합니다.
// // octokit = Octokit(auth='your_github_token')

// // # createForAuthenticatedUser 메서드를 호출하여 원격 저장소를 생성합니다.
// // response = octokit.rest.repos.createForAuthenticatedUser(
// //     name="repository-name",
// //     auto_init=False,  # README.md 파일을 자동으로 생성하지 않도록 설정합니다.
// //     gitignore_template=None,  # .gitignore 파일을 자동으로 생성하지 않도록 설정합니다.
// //     license_template=None  # LICENSE 파일을 자동으로 생성하지 않도록 설정합니다.
// // )

// // # 저장소 생성 결과를 출력합니다.
// // print(response)