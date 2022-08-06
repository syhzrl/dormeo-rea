#!/usr/bin/env bash
set -e

# In case you need to set a token via env vars
if [ "$CODEARTIFACT_AUTH_TOKEN" == "" ];
then
  echo "no CodeArtifact Auth Token detected. Getting one now . . . . . ."
  CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token \
  --domain dormeo \
  --query authorizationToken \
  --output text)
fi

# running command after heredoc: https://stackoverflow.com/questions/27301806/using-after-a-heredoc-in-bash
{ cat << EOF > .npmrc
@dm:registry=https://dormeo-173049628315.d.codeartifact.ap-southeast-1.amazonaws.com/npm/dormeo/
//dormeo-173049628315.d.codeartifact.ap-southeast-1.amazonaws.com/npm/dormeo/:always-auth=true
//dormeo-173049628315.d.codeartifact.ap-southeast-1.amazonaws.com/npm/dormeo/:_authToken=${CODEARTIFACT_AUTH_TOKEN}
EOF
} &&  npm ping
