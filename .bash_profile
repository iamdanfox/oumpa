#
# .bash_profile - executed for login shells
#
# $File: //systems/conf/LIVE/skel/bash_profile $
# $Revision: #2 $
# $Date: 2002/12/17 $
# $Author: pod $
#
runfrags=/etc/shellinit/bash/lib/runfrags
if [ -f $runfrags ]; then
  source $runfrags
  prefix=${PS1:+I}
  runfrags ${prefix:-N} /etc/shellinit/bash/bash_profile.d
  runfrags ${prefix:-N} ${HOME}/.bash_profile.d
fi
alias ls='ls --color=always'

