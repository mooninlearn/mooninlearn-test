const { execSync } = require('child_process');
const path = require('path');

// 로컬 폴더 경로
const localFolder = path.join('C:', 'folder1', 'folder2');

// GitHub 원격 저장소 URL (원격 저장소를 생성한 후 얻을 수 있습니다)
const remoteRepoUrl = 'https://github.com/username/repository-name.git';

try {
  // 1. 로컬 폴더를 Git 저장소로 초기화
  execSync('git init', { cwd: localFolder });
  console.log('Initialized empty Git repository.');

  // 2. 원격 저장소를 로컬 저장소에 연결
  execSync(`git remote add origin ${remoteRepoUrl}`, { cwd: localFolder });
  console.log(`Added remote origin: ${remoteRepoUrl}`);

  // 3. 모든 파일을 추가하고 커밋
  execSync('git add .', { cwd: localFolder });
  console.log('Staged all files.');

  execSync('git commit -m "Initial commit"', { cwd: localFolder });
  console.log('Committed all files.');

  // 4. 원격 저장소에 푸시
  execSync('git push -u origin master', { cwd: localFolder });
  console.log('Pushed to remote repository.');

} catch (error) {
  console.error('An error occurred:', error.message);
}