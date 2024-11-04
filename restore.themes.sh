echo "production environment"
pod=$(kubectl get pods -n main | grep Running | grep 'onelink' | awk '{print $1}')

echo "Restore users's themes"
kubectl cp ./linkstack/themes $pod:/htdocs/ -c onelink -n main

# A specific theme
# kubectl cp ./linkstack/themes/tpain onelink-659d4c66df-dg85c:/htdocs/themes -c onelink -n main
# kubectl cp ./linkstack/themes/tpain onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/ggl onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/arcade onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/of onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneOneOne onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneOneTwo onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneOneThree onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneOneFour onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneTwoOne onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneTwoTwo onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneTwoThree onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneTwoFour onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneThreeOne onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneThreeTwo onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneThreeThree onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneThreeFour onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneFiveOne onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneFiveTwo onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneFiveThree onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneFiveFour onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneNineOne onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneNineTwo onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneNineThree onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev
# kubectl cp ./linkstack/themes/oneNineFour onelink-594fdb84c7-49bv9:/htdocs/themes -c onelink -n dev


# Production
# kubectl cp ./linkstack/themes/arcade onelink-6bcb7ddc56-hvjtt:/htdocs/themes -c onelink -n main
# kubectl cp ./linkstack/themes/of onelink-6bcb7ddc56-hvjtt:/htdocs/themes -c onelink -n main
# kubectl cp ./linkstack/themes/ggl onelink-6bcb7ddc56-hvjtt:/htdocs/themes -c onelink -n main


echo "Restore users's avatar"
kubectl cp ./linkstack/assets/img $pod:/htdocs/assets/ -c onelink -n main
# kubectl cp ./linkstack/assets/linkstack/images/loading-spinner.gif onelink-594fdb84c7-rrhml:/htdocs/assets/linkstack/images/ -c onelink -n dev 
echo "Done"
