## Copy to dev env
echo "Copy to seeded database"

pod=$(kubectl get pods -n dev | grep Running | grep 'onelink' | awk '{print $1}')
kubectl cp ./onelink.sqlite $pod:/db/onelink.sqlite -n dev
kubectl cp ./onelink.sqlite onelink-69d9bbd5c6-8rhlz:/db/onelink.sqlite -n dev
echo "Done"

cat <<EOF | kubectl apply -f -
---
apiVersion: v1
kind: Pod
metadata:
  name: db-explorer
  namespace: dev
spec:
  containers:
    # This could be any image that we can SSH into and has curl.
  - image: garland/kubectl:1.10.4
    imagePullPolicy: IfNotPresent
    name: explorer
    resources: {}
    stdin: true
    terminationMessagePath: /dev/termination-log
    terminationMessagePolicy: File
    tty: true
    volumeMounts:
    - name: onelink
      mountPath: /db-pvc
  volumes:
  - name: onelink
    persistentVolumeClaim:
      claimName: onelink-cephfs-pvc
EOF