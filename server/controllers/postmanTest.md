### set up token
`client/src/app.jsx`
```js
const App = () => {
    //get token
  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  return ( ...
```

### in aiRouters
```js
aiRouter.post('/generate-article', auth, generateArticle)
```
he `auth` middleware checks this JWT before running `generateArticle`.

### in postman

method `post`
url `http://localhost:3000/api/ai/generate-article`
<br/>
<br/>
<br/>
### body -> raw
```json
{
    "prompt": "Imapact of AIon jobs",
    "length" : 800
}
```

### headers
`key` : Authorization
<br/>
`value` : Bearer `<token>`

