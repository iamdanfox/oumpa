#
# .bash_logout - executed for login shells at logout time
#
# $File: //systems/conf/LIVE/skel/bash_logout $
# $Revision: #3 $
# $Date: 2002/12/17 $
# $Author: pod $
#
runfrags=/etc/shellinit/bash/lib/runfrags
if [ -f $runfrags ]; then
  source $runfrags
  prefix=${PS1:+I}
  runfrags ${prefix:-N} /etc/shellinit/bash/bash_logout.d
  runfrags ${prefix:-N} ${HOME}/.bash_logout.d
fi
