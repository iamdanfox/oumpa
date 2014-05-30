#
# .bashrc - executed for non-login shells
#
# $File: //systems/conf/LIVE/skel/bashrc $
# $Revision: #2 $
# $Date: 2002/12/17 $
# $Author: pod $
#
runfrags=/etc/shellinit/bash/lib/runfrags
if [ -f $runfrags ]; then
  source $runfrags
  prefix=${PS1:+I}
  runfrags ${prefix:-N} /etc/shellinit/bash/bashrc.d
  runfrags ${prefix:-N} ${HOME}/.bashrc.d
fi
