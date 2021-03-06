import axios from 'axios'
import URLValidation from '../../helpers/URLValidation'

function _view(req, res) {
  return res.render('app/create', {
    _title: 'Create',
    _channel: req.cookies.channel
  })
}

async function _store(req, res) {
  if (!URLValidation(req.body.url)) {
    return res.send(`Bad Request\n<pre>URL not valid</pre>`)
  }

  try {
    await axios.post(
      'https://api.line.me/liff/v1/apps',
      { view: req.body },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${req.cookies.channel.token}`
        }
      }
    )
  } catch (err) { return res.send(`Bad Request\n<pre>${JSON.stringify(err.response.data)}</pre>`) }
  return res.redirect('/dashboard')
}

export default function(req, res) {
  return req.method === 'GET' ? _view(req, res) : _store(req, res)
}