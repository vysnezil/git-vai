# GITvai
### hosting pre remote git repozitáre (niečo ako github, gitlab...)

Aplikácia s webovým rozraním v ktorom si môžeme vytvárať git repozitáre následne do nich pushovať (cez git) a potom si
súbory v nich môžeme aj prezerať

základné funkcie:
- vytváranie repozitárov
- pushovanie do nich
- možnosť si súbory v prehliadači prezerať
- podpora viac branchov
- public / private repozitáre
- prístupové práva (môžeme niekomu povoliť prístup k nášmu repozitáru)
- http protokol (nie ssh)

Jedná sa o veľmi zjednodušenú verziu a tak všetky funkcie git-u niesu podporované

### použité technológie
- SvelteKit (https://svelte.dev/docs/kit/introduction)
- FontAwesome (https://fontawesome.com/)
- Tailwind CSS (https://tailwindcss.com/)
- Sequelize (https://sequelize.org/)
- Databáza SQLite (https://www.sqlite.org/)
- simple-git (https://github.com/steveukx/git-js)
- jose (https://github.com/panva/jose)
- bcpypt (https://github.com/kelektiv/node.bcrypt.js)

### spustenie

```bash
#manuálne
npm run start

#cez docker-compose
docker compose up
```
