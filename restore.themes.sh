echo "production environment"
pod=$(kubectl get pods -n main | grep Running | grep 'onelink' | awk '{print $1}')

echo "Restore users's themes"
kubectl cp ./linkstack/themes $pod:/htdocs/ -c onelink -n main

echo "Restore users's avatar"
kubectl cp ./linkstack/assets/img $pod:/htdocs/assets/ -c onelink -n main

echo "Done"
