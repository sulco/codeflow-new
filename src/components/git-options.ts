import Git from '../components/git.svelte';
import Github from '../components/github.svelte';
import Gitlab from '../components/gitlab.svelte';
import NoGit from '../components/no-git.svelte';

export let gitOptions = [
    { label: 'github.com/sulco/', logo: Github, dynamic: true },
    { label: 'gitlab.com/sulco/', logo: Gitlab, dynamic: true },
    { label: '`git init` only', logo: Git, dynamic: false },
    { label: 'no git', logo: NoGit, dynamic: false }
];