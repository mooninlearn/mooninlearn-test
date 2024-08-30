const { Octokit } = require('@octokit/rest');
const fs = require('fs');
const path = require('path');

// Octokit 인스턴스를 생성합니다.
const octokit = new Octokit({
  auth: 'your_github_token' // GitHub Personal Access Token을 입력하세요.
});

// 저장소 정보
const owner = 'your_github_username';
const repo = 'repository-name';
const branch = 'main'; // 기본 브랜치를 설정하세요.

// 로컬 폴더 경로 및 파일명
const localFolder = path.join('C:', 'folder1', 'folder2');
const fileName = 'example.txt'; // 업로드할 파일명

async function pushFileToRepo() {
  try {
    // 1. 현재 브랜치의 기본 정보를 가져옵니다.
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`
    });

    const commitSha = refData.object.sha;

    // 2. 현재 커밋에서 트리 정보를 가져옵니다.
    const { data: commitData } = await octokit.rest.git.getCommit({
      owner,
      repo,
      commit_sha: commitSha
    });

    const treeSha = commitData.tree.sha;

    // 3. 파일 내용을 읽어 Base64로 인코딩합니다.
    const filePath = path.join(localFolder, fileName);
    const content = fs.readFileSync(filePath, 'utf8');
    const base64Content = Buffer.from(content).toString('base64');

    // 4. 새 블롭(blob)을 만듭니다.
    const { data: blobData } = await octokit.rest.git.createBlob({
      owner,
      repo,
      content: base64Content,
      encoding: 'base64'
    });

    // 5. 새 트리를 만듭니다.
    const { data: treeData } = await octokit.rest.git.createTree({
      owner,
      repo,
      base_tree: treeSha,
      tree: [
        {
          path: fileName,
          mode: '100644', // 파일 퍼미션 설정
          type: 'blob',
          sha: blobData.sha
        }
      ]
    });

    // 6. 새 커밋을 만듭니다.
    const { data: newCommitData } = await octokit.rest.git.createCommit({
      owner,
      repo,
      message: 'Added example.txt',
      tree: treeData.sha,
      parents: [commitSha]
    });

    // 7. 브랜치를 업데이트하여 새 커밋을 적용합니다.
    await octokit.rest.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommitData.sha
    });

    console.log('File pushed successfully!');

  } catch (error) {
    console.error('An error occurred:', error.message);
  }
}

pushFileToRepo();
