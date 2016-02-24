var ews = require('../lib/ews');
var request = require('request');

ews.auth([process.env.OUTLOOK_DOMAIN, process.env.OUTLOOK_USER].join('\\'), process.env.OUTLOOK_PASSWORD, process.env.OUTLOOK_HOST);
console.log(['DOMAIN', 'USER', 'HOST'].map(function (k) { return process.env['OUTLOOK_' + k];}));
ews.soapOptions = {
  wsdl_options: {
    agentOptions: {
      rejectUnauthorized: false,
    },
    rejectUnauthorized: false,
  },
  request: request.defaults({
    strictSSL: false,
  })
};
ews.run('FindItem', {
  attributes: {Traversal: 'Shallow'},
  ItemShape: {
    BaseShape: 'Default',
  },
  IndexedPageItemView: {
    attributes: {
      MaxEntriesReturned: 50,
      BasePoint: 'Beginning',
      Offset: 0,
    },
  },
  ParentFolderIds: {
    DistinguishedFolderId: {
      attributes: {Id: 'inbox'},
    },
  },
}, function (err, result) {
  if (err) console.error({err:err});
  console.log(result);
});
ews.run('CreateItem', {
  attributes: {
    'MessageDisposition': 'SendAndSaveCopy',
  },
  SavedItemFolderId: {DistinguishedFolderId: {attributes: {Id: 'drafts'}}},
  Items: {
    Message: {
      ItemClass: 'IPM.Note',
      Subject: 'NPM Rocks!',
      Body: {
        attributes: {BodyType: 'Text'},
        $value: 'how cool is this',
      },
      ToRecipients: {
        Mailbox: {
          EmailAddress: 'success@r24y.com'
        }
      },
      IsRead: 'false'
    }
  }
}, function (err, result) {
  if (err) {
    debugger;
    console.error({err:err});
  }
  console.log(result);
});
