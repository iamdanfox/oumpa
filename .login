#
# .login - run at shell login time (after cshrc)
#
# $File: //systems/conf/LIVE/skel/login $
# $Revision: #2 $
# $Date: 2002/12/17 $
# $Author: pod $
#
set runfrags=/etc/shellinit/tcsh/lib/runfrags
alias runfrags 'set _args=(\!*); if ( -f $runfrags ) source $runfrags'
set prefix=N
if ( $?prompt ) set prefix=I
runfrags $prefix /etc/shellinit/tcsh/login.d
runfrags $prefix ~/.login.d
