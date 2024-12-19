import axios from "axios";

const owner = "username";
const repo = "reponame";
const branch = "main";
const token = ""; // Replace with an environmenst variable in production

// folders Tree
const filesToCommit = {
  folder1: {
    "file1.txt": "This is the content of file1 in folder1.",
    "file2.txt":
      "This is the content of file2 in folder1. modified folder 1 file 2",
    subfolder1: {
      "file1.txt": "This is the content of file1 in subfolder1 of folder1.",
      subsubfolder1: {
        "file1.txt":
          "This is the content of file1 in subsubfolder1 of subfolder1.",
      },
    },
  },
  folder2: {
    "file1.txt": "This is the content of file1 in folder2.",
    "file2.txt": "This is the content of file2 in folder2.",
    "index.html": `<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vite + React</title>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>

</html>`,
  },
};

// commit Message
const commitMessage = "Change index.html file structure";

// Function to get the latest commit SHA
async function getLatestCommitSHA() {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.sha;
}

// Function to create a Blob for the text content
async function createBlob(textContent) {
  try {
    const base64Content = btoa(textContent); // Encode text content to base64

    const response = await axios.post(
      `https://api.github.com/repos/${owner}/${repo}/git/blobs`,
      {
        content: base64Content,
        encoding: "base64",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.sha;
  } catch (error) {
    console.error("Error creating blob:", error.message || error);
  }
}

// Function to create a new Tree
async function createTree(latestCommitSHA, fileStructure, folderPath = "") {
  const tree = [];

  for (const [key, value] of Object.entries(fileStructure)) {
    const currentPath = folderPath ? `${folderPath}/${key}` : key;

    if (typeof value === "string") {
      // Value is file content, create blob
      const blobSHA = await createBlob(value);
      tree.push({
        path: currentPath,
        mode: "100644",
        type: "blob",
        sha: blobSHA,
      });
    } else if (typeof value === "object") {
      // Value is another folder, call createTree recursively
      const nestedTree = await createTree(latestCommitSHA, value, currentPath);
      tree.push(...nestedTree);
    }
  }

  return tree;
}

// Function to create a Commit
async function createCommit(latestCommitSHA, treeSHA, commitMessage) {
  const { data } = await axios.post(
    `https://api.github.com/repos/${owner}/${repo}/git/commits`,
    {
      message: commitMessage,
      parents: [latestCommitSHA],
      tree: treeSHA,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.sha;
}

// Function to get the current reference SHA
async function getCurrentReferenceSHA() {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.object.sha; // This is the current SHA of the branch
}

// Function to update the reference (push the commit)
async function updateReference(commitSHA) {
  const currentSHA = await getCurrentReferenceSHA();

  // Only update if the commitSHA is different from the currentSHA
  if (currentSHA !== commitSHA) {
    await axios.patch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs/heads/${branch}`,
      {
        sha: commitSHA,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Reference updated successfully!");
  } else {
    console.log("No update needed. Current SHA is the same.");
  }
}

// Function to get the SHA of the latest tree
async function getLatestTreeSHA() {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/branches/${branch}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.commit.commit.tree.sha;
}

// Recursive function to build the nested structure
async function fetchTreeRecursive(treeSHA) {
  const { data } = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/${treeSHA}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const tree = await Promise.all(
    data.tree.map(async (node) => {
      if (node.type === "tree") {
        return {
          ...node,
          children: await fetchTreeRecursive(node.sha),
        };
      } else {
        return node;
      }
    })
  );

  return tree;
}

// Main function to get the full repository structure
async function getRepoTree() {
  try {
    const latestTreeSHA = await getLatestTreeSHA();
    const fullTree = await fetchTreeRecursive(latestTreeSHA);

    return fullTree;
  } catch (error) {
    throw new Error("Error fetching repository tree:", error.message || error);
  }
}

// Function to get the content of a specific file
async function getFileContent(filePath) {
  try {
    const response = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Decode the base64 content
    const fileContent = atob(response.data.content);
    console.log(`Content of ${filePath}:`, fileContent);
    return fileContent;
  } catch (error) {
    console.error(
      `Error fetching content of ${filePath}:`,
      error.message || error
    );
  }
}

// Example to get content of a file
const exampleFilePath = "folder2/index.html"; // Change this path as needed
getFileContent(exampleFilePath);

// Function to commit multiple files
async function commitMultipleFiles(fileStructure, commitMessage) {
  try {
    const latestCommitSHA = await getLatestCommitSHA();
    const tree = await createTree(latestCommitSHA, fileStructure);
    const treeSHA = await axios
      .post(
        `https://api.github.com/repos/${owner}/${repo}/git/trees`,
        { tree, base_tree: latestCommitSHA },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => response.data.sha);
    const commitSHA = await createCommit(
      latestCommitSHA,
      treeSHA,
      commitMessage
    );
    await updateReference(commitSHA);
    console.log("Multiple files committed successfully!");
  } catch (error) {
    console.error("Error committing multiple files:", error.message || error);
  }
}

// Component to commit files
const App = () => {
  getRepoTree();
  commitMultipleFiles(filesToCommit, commitMessage);
  return <div>Hello</div>;
};

export default App;
