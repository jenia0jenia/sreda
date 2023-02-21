FILES="*.png"
for f in $FILES
do
  if [ -f "$f" ]
  then
    echo "Processing $f file..."
    # pngquant --quality 1-2 -o ./reduce/$f -- $f
    mogrify -quality 5 -path ./mogrify $f
    echo "`du $f` after compression `du ./mogrify/$f`"
  else
    echo "Warning: Some problem with \"$f\""
  fi
  break
done