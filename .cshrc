#
# .cshrc - run at shell startup time
#
# $File: //systems/conf/LIVE/skel/cshrc $
# $Revision: #2 $
# $Date: 2002/12/17 $
# $Author: pod $
#
set runfrags=/etc/shellinit/tcsh/lib/runfrags 
alias runfrags 'set _args=(\!*); if ( -f $runfrags ) source $runfrags'
set prefix=N
if ( $?prompt ) set prefix=I
runfrags $prefix /etc/shellinit/tcsh/cshrc.d
runfrags $prefix ~/.cshrc.d
